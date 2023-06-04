package com.example.Project3.filters;

import com.auth0.jwt.JWT;
import com.example.Project3.beans.TheSession;
import com.example.Project3.exceptions.UnauthorizedException;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;

/**
 * This class is a filter that all the end points that we want to be used only with authorization will have to
 * go through it before getting to the end points.
 */
@Component
@Order(2)
public class TokenFilter extends OncePerRequestFilter {

    private HashMap<String, TheSession> sessions;

    public TokenFilter(HashMap<String, TheSession> sessions) {
        this.sessions = sessions;
    }

    /**
     * This method is to implement the process of checking the authorization by checking if
     * there is a token (Our program using a token for authorization) in the request from the client
     * and if there is than also checking if it is valid.
     *
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String token = request.getHeader("authorization").replace("Bearer ", "");
            String name = JWT.decode(token.replace("Bearer ", "")).getClaim("name").asString();
            if (!sessions.containsKey(token)) {
                throw new UnauthorizedException();
            }

            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.MINUTE, cal.get(Calendar.MINUTE) - 30);
            if (sessions.get(token).getCalendar().before(cal)) {
                sessions.remove(token);
                throw new UnauthorizedException();
            }

            sessions.get(token).setCalendar(Calendar.getInstance());
//             all is well, move on
            filterChain.doFilter(request, response); // move to next filter on the chain
        } catch (Exception e) {
            response.setStatus(401);
            response.getWriter().write("Unauthorized, please log in!");
        }
    }

    /**
     * This method is for the end points that we don't want to check authorization before getting to them,
     * it "says" to the filter what are the and points to skip while the filter is running.
     *
     * @param request
     * @return the end points that we don't want to check.
     * @throws ServletException
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().startsWith("/auth");
    }
}

