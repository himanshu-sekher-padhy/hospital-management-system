package com.hms.gateway.Filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config>{
    private static final String SECRET="9c1f48f969cdadf97085022f2662929ac479a8c29afe1411f55f218cedad458a520fcda65c06efd01828604c576c180abc609f3cc9f0dff8e6ea01ed57020c4b";

    public TokenFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config){
        return (exchange, chain)-> {
            String path= exchange.getRequest().getPath().toString();
            if(path.equals("/user/signin")||path.equals("/user/signup")){

                return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET" )).build());
            }
            HttpHeaders header= exchange.getRequest().getHeaders();
            if(!header.containsKey(HttpHeaders.AUTHORIZATION)){
                throw new RuntimeException("Authorization header is missing");
            }
            String authHeader=header.getFirst(HttpHeaders.AUTHORIZATION);
            if(authHeader==null||!authHeader.startsWith("Bearer")){
                throw new RuntimeException("Invalid Authorization header");
            }
            String token= authHeader.substring(7);
            try{
                Claims claims=Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
                exchange= exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET" )).build();

            } catch(Exception e){
                throw new RuntimeException("Token is Invalid");
            }
            return chain.filter(exchange);
        };
    }

    public static class Config{

    }
    
}
