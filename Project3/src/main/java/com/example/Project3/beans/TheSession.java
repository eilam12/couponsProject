package com.example.Project3.beans;

import com.example.Project3.services.ClientBL;

import java.util.Calendar;


public class TheSession {
    private ClientBL clientBL;
    private Calendar calendar;

    public TheSession(ClientBL clientBL, Calendar calendar) {
        this.clientBL = clientBL;
        this.calendar = calendar;
    }

    public ClientBL getClientBL() {
        return clientBL;
    }

    public void setClientBL(ClientBL clientBL) {
        this.clientBL = clientBL;
    }

    public Calendar getCalendar() {
        return calendar;
    }

    public void setCalendar(Calendar calendar) {
        this.calendar = calendar;
    }
}
