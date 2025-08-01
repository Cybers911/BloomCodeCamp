package com.hcc.utils;

import org.springframework.stereotype.Component;


//
//
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
//
//
@Component
public class CustomPasswordEncoder {
    private PasswordEncoder passwordEncoder;
//
    public CustomPasswordEncoder(){
        this.passwordEncoder = new BCryptPasswordEncoder(); }
//
    public PasswordEncoder getPasswordEncoder(){
        return passwordEncoder;
    }
}
