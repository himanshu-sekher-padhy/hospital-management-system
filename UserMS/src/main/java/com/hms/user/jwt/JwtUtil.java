package com.hms.user.jwt;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final Long JWT_TOKEN_VALIDITY=5*60*60L;
    private static final String SECRET="9c1f48f969cdadf97085022f2662929ac479a8c29afe1411f55f218cedad458a520fcda65c06efd01828604c576c180abc609f3cc9f0dff8e6ea01ed57020c4b";

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims= new HashMap<>();
        CustomUserDetails user= (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("profileId", user.getProfileId());
        return doGenerateToken(claims, userDetails.getUsername());
    }

    public String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY*1000)).signWith(SignatureAlgorithm.HS512, SECRET).compact();
    }


}
