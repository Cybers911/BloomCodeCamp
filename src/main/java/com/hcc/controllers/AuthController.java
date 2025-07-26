package com.hcc.controllers;

import com.hcc.entities.User;
import com.hcc.services.UserService;
import com.hcc.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService; // Replaced UserRepository with UserService

    // Login endpoint to authenticate and generate a JWT token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        try {
            // Authenticate the user with provided credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (Exception e) {
            // Return 401 Unauthorized for invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }

        // Use UserService to retrieve the user
        User user = userService.findByUsername(username); // Replaced UserRepository call with UserService
        String token = jwtUtil.generateToken(user);

        // Return the token in the response
        return ResponseEntity.ok(Map.of("token", token));
    }

    // Endpoint to validate a JWT token
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        String jwt = token.replace("Bearer ", "");
        boolean isValid = jwtUtil.validateToken(jwt, null); // UserDetails validation can also be added if required.
        return ResponseEntity.ok(Map.of("isValid", isValid)); // Return the token's validity
    }

    // Register endpoint to create a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registerRequest) {
        String username = registerRequest.get("username");
        String password = registerRequest.get("password");

        // Validate input
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        try {
            // Check if user already exists
            if (userService.userExists(username)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }

            // Create new user
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password); // Password will be encoded by UserService

            User savedUser = userService.saveUser(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user: " + e.getMessage());
        }
    }
}