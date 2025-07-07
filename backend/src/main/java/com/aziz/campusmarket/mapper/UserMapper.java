package com.aziz.campusmarket.mapper;

import com.aziz.campusmarket.dto.UserDto;
import com.aziz.campusmarket.modal.User;

public class UserMapper {

    public static UserDto toUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        return userDto;
    }
}
