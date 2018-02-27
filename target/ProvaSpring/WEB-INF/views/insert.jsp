<%@page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<html>
<head>
    <title>User</title>
    <link rel="stylesheet" href="<c:url value="/static/css/Stile.css"/>" > </link>
    <script src="<c:url value="/static/js/JavaClass.js"/>" ></script>
</head>

<body>
<H1>User</H1>


<TABLE class="lungT">

    <%-------------------------- Form registrazione ----------------------%>
    <form:form action="/insert-${user.id}" method="post" onsubmit="SelectSkill()" modelAttribute="user">
        <tr class="lig">
            <td>
                <form:hidden path="id" />
                Nome : <form:input cssClass="put" path="firstname" />
            </td>
        </tr>
        <tr class="lig">
            <td>
                Cognome : <form:input cssClass="put" path="lastname" />
            </td>
        </tr>
        <tr class="lig">
            <td>
                <fmt:formatDate pattern="dd/MM/yyyy" value="${user.data}" var="dt"/>
               Data :  <input type="text" name="data" value="${dt}" class="put" />
            </td>
        </tr>
        <tr class="lig">
            <td>
                    <%---------- Get status user --------%>
                    Stato : <select name="status" class="se">
                        <c:if test="${user.status != null}">
                            <option value="${user.status}" selected>${user.status}</option>
                        </c:if>
                        <c:forEach items="${stat}" var="st">
                            <c:if test="${st != user.status}">
                                <option value="${st}">${st}</option>
                            </c:if>
                        </c:forEach>

            </select>
            </td>
        </tr>
        <tr class="lig">

                <td>
                    Default skill <select multiple="multiple" name="ski"  id="ski" class="sl">
                    <c:forEach items="${ski}" var="skill">

                        <option value="${skill.description}">${skill.description}</option>

                    </c:forEach>  </select>

                    <input type="button" value="+" onclick="Add()" class="Bottone">
                    <input type="button" value="-" onclick="Sub()" class="Bottone">

                    <select multiple="multiple" name="skills" id="skills" class=" sl">
                        <c:forEach items="${user.skills}" var="su">

                            <option value="${su.description}">${su.description}</option>


                        </c:forEach>
                    </select> skill add

         </td>

        </tr>

        <tr class="lig">
            <td>
                <input type="submit" value="Send" class="Bottone"/>
            </td>
        </tr>

    </form:form>

</TABLE>




</body>
</html>



