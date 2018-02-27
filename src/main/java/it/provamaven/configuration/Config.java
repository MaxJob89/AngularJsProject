package it.provamaven.configuration;

/**
 * Created by massimo_buonocore on 23/03/17.
 */


import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "it.provamaven")
public class Config extends WebMvcConfigurerAdapter {



    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path systemPath = Paths.get("");
        String pathImage = systemPath.toAbsolutePath().getParent().toString()+"/imageProjectAngular/";
        registry.addResourceHandler("/**/*").addResourceLocations("/");
        registry.addResourceHandler("/imageProjectAngular/*").addResourceLocations("file:"+pathImage);
    }

    //    -------------- Error Message ---------
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        return messageSource;
    }


//  -------------- Configuration Multipart for send file -----------
    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }
}