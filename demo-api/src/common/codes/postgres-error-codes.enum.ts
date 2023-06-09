enum PostgresErrorCode {
  IntegrityConstraintViolation = '23000',
  RestrictViolation = '23001',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503',
  UniqueViolation = '23505',
  CheckViolation = '23514',
  ExclusionViolation = '23P01',
}

export default PostgresErrorCode;
