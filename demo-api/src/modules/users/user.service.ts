import { EStatus } from '@api-common/enums';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { digits, lower, randomPassword, upper } from 'secure-random-password';
import PostgresErrorCode from '@api-common/codes/postgres-error-codes.enum';
import ERole from '@api-common/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ProfileDto } from './dtos/profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { Paginate } from '@api-common/interfaces/paginate.interface';
import { DetailUserDto } from './dtos/detail-user.dto';
import { AuthenticatedUserDto } from '@modules/auth/dtos/authenticated-user.dto';
import { UserMapping } from './user.mapping';
import {
  EMAIL_ALREADY_EXIST,
  ERROR_OCCURED,
  OLD_PASSWORD_INCORRECT,
  PASSWORD_NOT_CHANGED,
  REPEATED_PASSWORD_IS_NOT_VALID,
  USER_NOT_FOUND,
} from '@api-common/constants/error-mesages.constant';
import { UpdateAdministratorDto } from './dtos/update-administrator.dto';
import { CreateAdministratorDto } from './dtos/create-administrator.dto';

@Injectable()
export class UserService {
  mapTo = new UserMapping();

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUserByEmail(Email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { Email, IsDeleted: false, Status: EStatus.Active },
    });
  }

  async getUserById(Id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { Id, IsDeleted: false, Status: EStatus.Active },
    });
  }

  async updateRefreshToken(
    Id: number,
    HashedRefreshToken: string,
  ): Promise<UserEntity> {
    const update = await this.getUserById(Id);

    update.HashedRefreshToken = HashedRefreshToken;

    return await this.usersRepository.save(update);
  }

  async registerAdmin(): Promise<boolean> {
    const find = await this.usersRepository.findOne({
      where: {
        Role: ERole.Admin,
      },
    });

    if (!find) {
      const passcode = this.configService.get('ADMIN_PASSWORD');
      const hashedPasscode = await bcrypt.hash(passcode, 10);

      const user = new UserEntity();
      user.Email = this.configService.get('ADMIN_EMAIL');
      user.Name = this.configService.get('ADMIN_NAME');
      user.Surname = this.configService.get('ADMIN_SURNAME');
      user.Position = 'Support';
      user.Passcode = hashedPasscode;
      user.Role = ERole.Admin;
      user.CreatedBy = 'System';
      user.Status = EStatus.Active;

      const save = await this.usersRepository.save(user);
      if (save) return true;
    }

    return false;
  }

  async updateProfile(
    updateProfile: ProfileDto,
    user: AuthenticatedUserDto,
  ): Promise<boolean> {
    const getUser = await this.usersRepository.findOne({
      where: {
        IsDeleted: false,
        Id: updateProfile.UserId,
      },
    });

    if (updateProfile.Name) getUser.Name = updateProfile.Name;

    if (updateProfile.Surname) getUser.Surname = updateProfile.Surname;

    getUser.LastUpdateBy = `${user.Name} ${user.Surname}`;

    const save = await this.usersRepository.save(getUser);

    if (save) return true;

    return false;
  }

  async changePassword(
    changePassword: ChangePasswordDto,
    user: AuthenticatedUserDto,
  ): Promise<boolean> {
    const getUser = await this.usersRepository.findOne({
      where: {
        IsDeleted: false,
        Id: changePassword.UserId,
      },
    });

    const oldPasscode = changePassword.OldPassword;

    const isPasscodeMatching = await bcrypt.compare(
      oldPasscode,
      getUser.Passcode,
    );

    if (!isPasscodeMatching) {
      throw new HttpException(OLD_PASSWORD_INCORRECT, HttpStatus.BAD_REQUEST);
    }

    if (changePassword.NewPassword !== changePassword.NewRePassword) {
      throw new HttpException(
        REPEATED_PASSWORD_IS_NOT_VALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPasscode = await bcrypt.hash(changePassword.NewPassword, 10);

    getUser.Passcode = newPasscode;
    getUser.LastUpdateBy = `${user.Name} ${user.Surname}`;

    const save = await this.usersRepository.save(getUser);

    if (save) {
      return true;
    }

    throw new HttpException(PASSWORD_NOT_CHANGED, HttpStatus.BAD_REQUEST);
  }

  async getAdministrators(
    limit: number,
    page: number,
    showMode: EStatus,
  ): Promise<Paginate<DetailUserDto[]>> {
    const getData = this.usersRepository
      .createQueryBuilder('user')
      .where('user.IsDeleted = :isDeleted', {
        isDeleted: false,
      })
      .andWhere('user.Role = :role', {
        role: ERole.Admin,
      })
      .andWhere(`NOT user.Email =:email`, {
        email: this.configService.get('ADMIN_EMAIL'),
      });

    if (!Number.isNaN(showMode)) {
      getData.andWhere(`user.Status = :status`, {
        status: showMode,
      });
    }

    page = page === 1 ? 0 : page - 1;

    getData.take(limit).skip(page * limit);

    getData.orderBy('user.CreatedDate', 'DESC');

    const collectionSize = await getData.getCount();

    const mappedData = this.mapTo.many(await getData.getMany());

    const result: Paginate<DetailUserDto[]> = {
      collectionSize,
      pageSize: limit,
      page: page + 1,
      data: mappedData,
    };
    return result;
  }

  async getOne(detailId: number): Promise<DetailUserDto> {
    const getOne = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.IsDeleted = :isDeleted AND user.Id = :detailId', {
        isDeleted: false,
        detailId,
      })
      .getOne();

    const result = this.mapTo.one(getOne);

    return result;
  }

  async getAdministratorById(detailId: number): Promise<DetailUserDto> {
    const getOne = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.AssignedFederation', 'assigned_federation')
      .where('user.IsDeleted = :isDeleted AND user.Id = :detailId', {
        isDeleted: false,
        detailId,
      })
      .getOne();

    const result = this.mapTo.one(getOne);

    return result;
  }

  async createAdministrator(
    createDto: CreateAdministratorDto,
    user: AuthenticatedUserDto,
  ): Promise<DetailUserDto> {
    try {
      const create = new UserEntity();

      for (const dtoKey in createDto) {
        const elementDto = createDto[dtoKey];
        create[dtoKey] = elementDto;
      }

      create.CreatedBy = `${user.Name} ${user.Surname}`;

      const tempPassword = randomPassword({
        length: 8,
        characters: [lower, upper, digits],
      });

      const hashedPasscode = await bcrypt.hash(tempPassword, 10);

      create.Passcode = hashedPasscode;
      create.Role = ERole.Admin;
      create.Claims = [];
      create.Position = 'Admin';

      create.IsInResetMode = false;
      create.CreatedBy = `${user.Name} ${user.Surname}`;

      const save = await this.usersRepository.save(create);

      return this.mapTo.one(save);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(EMAIL_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(ERROR_OCCURED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAdministrator(
    updateDto: UpdateAdministratorDto,
    user: AuthenticatedUserDto,
  ): Promise<DetailUserDto> {
    const update = await this.usersRepository.findOne({
      where: {
        IsDeleted: false,
        Id: updateDto.Id,
      },
    });

    if (!update) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    for (const dtoKey in updateDto) {
      const elementDto = updateDto[dtoKey];
      update[dtoKey] = elementDto;
    }

    update.LastUpdateBy = `${user.Name} ${user.Surname}`;

    const save = await this.usersRepository.save(update);

    return this.mapTo.one(save);
  }
}
