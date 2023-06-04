package com.example.Project3;

import com.example.Project3.beans.TheSession;
import com.example.Project3.threads.CouponExpirationDailyJob;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;

@SpringBootApplication
public class Project3Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(Project3Application.class, args);

        CouponExpirationDailyJob couponExpirationDailyJob = ctx.getBean(CouponExpirationDailyJob.class);
        Thread thread = new Thread(couponExpirationDailyJob);
        thread.start();

//        couponExpirationDailyJob.stop();
//        thread.interrupt();
    }

    @Bean
    public HashMap<String, TheSession> sessions() {
        return new HashMap<>();
    }

}
