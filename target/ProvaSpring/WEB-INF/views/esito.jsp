<%@page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Esito</title>
    <meta http-equiv="Refresh" content="3;url=/">
</head>
<style>
    .errore
    {
        color: red;
    }
    .successo
    {
        color: green;
    }
</style>
<body>

    <br>
    <c:choose>
        <c:when test="${msg ==0}">
            <h3 class="errore">Operation Failed </h3>
        </c:when>
        <c:when test="${msg > 0}">
            <h3 class="successo">Operation Success </h3>
        </c:when>
    </c:choose>

        <p>Automatic redirect Home page...</p>




</body>
</html>




