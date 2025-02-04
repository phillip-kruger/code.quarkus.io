package com.test

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/hello")
class TestResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    fun hello() = "Hello from RESTEasy Reactive"
}