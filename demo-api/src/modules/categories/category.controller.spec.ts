import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ShortCategory } from './dtos/short-category.dto';
import { ELanguage } from '@api-common/enums';

class CategoryServiceMock {
  getShort(): ShortCategory[] {
    return [
      {
        Id: 1,
        Contents: [
          {
            Title: 'Title az',
            Language: ELanguage.az,
            Id: 1,
          },
          {
            Title: 'Title en',
            Language: ELanguage.en,
            Id: 2,
          },
        ],
      },
    ];
  }
}

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useClass: CategoryServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should return an array of cats', () => {
    const cats = controller.getShort();
    expect(cats).toEqual([
      {
        Id: 1,
        Contents: [
          {
            Title: 'Title az',
            Language: ELanguage.az,
            Id: 1,
          },
          {
            Title: 'Title en',
            Language: ELanguage.en,
            Id: 2,
          },
        ],
      },
    ]);
  });
});
