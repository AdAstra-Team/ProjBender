package org.example.configurations.mapping;

import org.dozer.CustomConverter;
import java.util.UUID;

public class UUIDConverter implements CustomConverter {
    @Override
    public Object convert(Object destination, Object source, Class<?> destClass, Class<?> sourceClass) {
        if (source == null) {
            return null;
        }
        if (source instanceof String) {
            return UUID.fromString((String) source);
        } else if (source instanceof UUID) {
            return source.toString();
        }
        throw new IllegalArgumentException("Invalid UUID conversion");
    }
}
