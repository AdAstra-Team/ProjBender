package org.example.services;

import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MappingService {

    @Autowired
    private DozerBeanMapper dozerBeanMapper;

    public <T> T map(Object source, Class<T> destinationClass) {
        return dozerBeanMapper.map(source, destinationClass);
    }
}