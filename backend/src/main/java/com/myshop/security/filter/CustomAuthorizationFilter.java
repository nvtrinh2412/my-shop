package com.myshop.security.filter;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
         if(request.getRequestURI().equals("/api/login")) {
             filterChain.doFilter(request, response);
         } else {
             response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
         }
    }
}
