import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import CreateUserDto from './dto/createUser.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly postsService: PostsService, // @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async delete(userId: string) {
    // const session = await this.connection.startSession();

    // session.startTransaction();
    // try {
    const user = await this.userModel
      .findByIdAndDelete(userId)
      .populate('posts');
    // .session(session);

    if (!user) {
      throw new NotFoundException();
    }
    const posts = user.posts;

    await this.postsService.deleteMany(
      posts.map((post) => post._id.toString()),
      // session,
    );
    //   await session.commitTransaction();
    // } catch (error) {
    //   await session.abortTransaction();
    //   throw error;
    // } finally {
    //   session.endSession();
    // }
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }
}
