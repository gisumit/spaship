import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { MAX, MESSAGE, MIN, VALIDATION } from 'src/configuration';

export class CreateEnvironmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.PROPERTY, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.PROPERTY_IDENTIFIER, { message: MESSAGE.INVALID_PROPERTY_IDENTIFIER, always: true })
  propertyIdentifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.ENV, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.ENV, { message: MESSAGE.INVALID_ENV, always: true })
  env: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.CLUSTER, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.CLUSTER, { message: MESSAGE.INVALID_CLUSTER, always: true })
  cluster: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.DEFAULT, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.URL, { message: MESSAGE.INVALID_URL, always: true })
  url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export class SyncEnvironmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.PROPERTY, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.PROPERTY_IDENTIFIER, { message: MESSAGE.INVALID_PROPERTY_IDENTIFIER, always: true })
  propertyIdentifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.ENV, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.ENV, { message: MESSAGE.INVALID_ENV, always: true })
  env: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sync: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export class SymlinkDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.PROPERTY, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.PROPERTY_IDENTIFIER, { message: MESSAGE.INVALID_PROPERTY_IDENTIFIER, always: true })
  propertyIdentifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(MIN.DEFAULT, MAX.ENV, { message: MESSAGE.INVALID_LENGTH, always: true })
  @Matches(VALIDATION.ENV, { message: MESSAGE.INVALID_ENV, always: true })
  env: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  // @internal TODO : validations to be decided
  // @Matches(VALIDATION.FOLDER, { message: MESSAGE.INVALID_FOLDER, always: true })
  source: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  // @internal TODO : validations to be decided
  // @Matches(VALIDATION.FOLDER, { message: MESSAGE.INVALID_FOLDER, always: true })
  target: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export class OperatorSymlinkRequest {
  environment: OperatorSymlinkEnvironment;

  metadata: OperatorSymlinkMetadata;
}

export class OperatorSymlinkMetadata {
  source: string;

  target: string;
}

export class OperatorSymlinkEnvironment {
  websiteName: string;

  nameSpace: string;

  name: string;
}
