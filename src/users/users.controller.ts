import {
  Controller,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { User } from './user.schema';
import { UsersService } from './users.service';

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete()
  @UseGuards(JwtAuthenticationGuard)
  deleteUser(@Req() req: RequestWithUser) {
    return this.usersService.delete(req.user.id);
  }
}
