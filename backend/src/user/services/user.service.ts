import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { UserDto } from '../dtos/user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async createUser(UserDto: UserDto) {
    console.log(this.userModel);
    return this.userModel.findOneAndUpdate(
      { firebaseId: UserDto.firebaseId },
      UserDto,
      { upsert: true, new: true },
    );
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      email: email,
    });
  }
}
