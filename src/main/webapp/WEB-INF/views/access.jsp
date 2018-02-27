<%@page isELIgnored="false"%>
<%@ page import="java.util.List" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>Access</title>
    <link href="Stile.css" rel="stylesheet" type="text/css">
</head>

<body>
<H1>Access</H1>

<TABLE>

    <c:forEach  items="${rest}" var="res">
     <tr>
         <td>
             <form action="/AccessSend" method="post" >
                     <tr>
                     <td>
                         Nome : <input type="text" name="nome" value="${res.getFirstname()}">
                     </td>
                     </tr>

                     <tr>
                     <td>
                         Cognome : <input type="text" name="cognome" value="${res.getLastname()}">
                     </td>
                     </tr>

                    <tr>
                        <td>

                                Skills:<select multiple name="skill">
                            <c:forEach items="${res.getSkills()}" var="descskill">
                                <option>${descskill.getDescription()}</option>

                            </c:forEach>
                                <input type="submit" name="removeskill" value="Less" onclick="/removeskills">
                                </select>
                            </form>
                        </td>
                    </tr>


                     <tr>
                     <td>
                         <input hidden name="rest" value="${res.getId()}">
                         <input type="submit"  value="Send">
                     </td>
                        
                     </tr>

                 </tr>
                 </form>

         </td>

     </tr>
    </c:forEach>
</TABLE>









</body>
</html>




