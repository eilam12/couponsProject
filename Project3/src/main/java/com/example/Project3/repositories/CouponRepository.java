package com.example.Project3.repositories;

import com.example.Project3.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    @Modifying
    @Transactional
    @Query(value = "delete from customers_coupons where coupons_id=?1", nativeQuery = true)
    void deletePurchaseByCouponId(int couponId);
}
