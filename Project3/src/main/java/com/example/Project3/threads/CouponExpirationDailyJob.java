package com.example.Project3.threads;

import com.example.Project3.beans.Coupon;
import com.example.Project3.repositories.CouponRepository;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

/**
 * the CouponExpirationDailyJob class is a class that implements Runnable to create a thread that has a logic
 * for this program. The purpose of it is to have a thread that checks and delete the coupons that already expired.
 */
@Service
public class CouponExpirationDailyJob implements Runnable {
    private CouponRepository couponRepository;
    private boolean quit;

    public CouponExpirationDailyJob(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    /**
     * An Override for the method run().
     * the method go through the coupons once a day to check and delete the coupons that already expired.
     */
    @Override
    public void run() {
        while (!quit) {
            List<Coupon> coupons = couponRepository.findAll();
            for (Coupon c : coupons) {
                Calendar now = Calendar.getInstance();
                now.set(Calendar.HOUR_OF_DAY, 0);
                now.set(Calendar.MINUTE, 0);
                now.set(Calendar.SECOND, 0);

                if (c.getEndDate().before(now.getTime())) {
                    couponRepository.deletePurchaseByCouponId(c.getId());
                    couponRepository.deleteById(c.getId());
                }
            }
            try {
                Thread.sleep(1000 * 60 * 60 * 24);
            } catch (InterruptedException e) {
            }
        }
    }

    /**
     * this method is used to stop the thread
     */
    public void stop() {
        quit = true;
    }
}

