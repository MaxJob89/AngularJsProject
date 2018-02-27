<%@page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
  <head>
      <title>List</title>
      <link rel="stylesheet" href="<c:url value="/static/css/Stile.css"/>" > </link>
      <script type="text/javascript" src="<c:url value="/static/js/JavaClass.js"/>"></script>
      <%----------- Funzione per il caricamento quando si preme il tasto back del browser ----------%>
      <SCRIPT language="JavaScript">
            function Loading() {
                var params = {};
                if (location.search) {
                    var parts = location.search.substring(1).split('&');

                    for (var i = 0; i < parts.length; i++) {
                        var nv = parts[i].split('=');
                        if (!nv[0]) continue;
                        params[nv[0]] = nv[1] || true;
                    }
                }
                var number=params.number;
                document.getElementById("number").value=number.toString();
            }

      </SCRIPT>
  </head>

  <body onload="Loading()">

    <H1>LIST</H1>
    <form  method="GET" name="home">
    <table class="Filtro">
      <tr>
        <th>     </th>
        <th>    </th>
      </tr>
      <tr>
      <td>
          <input type="text" name="fil" id="fil"  class="inp" value="${nomeFil}" onchange="Begin(home)">
      </td>

        <td>
    <input type="submit"  value="Filtres" class="Fil">
        </td>
      </tr>

    </table>

<table>


    <tr>
      <th>   Nome   </th>
      <th>   Cognome   </th>
      <th>   Data  </th>
      <th>   Skills </th>
      <th>     </th>

    </tr>

    <c:forEach items="${user}" var="res" >
      <tr class="trr">

        <td>${res.firstname}</td>
        <td>${res.lastname}</td>
        <td><fmt:formatDate pattern="dd/MM/yyyy" value="${res.data}"/></td>
        <td>
        <table>
          <c:forEach items="${res.skills}" var="ski">

              <td>
                ${ski.description}
              </td>
              <td></td>

          </c:forEach>
        </table>

        </td>
        <td>
          <a href="<c:url value='/viewuser-${res.id}'/>"> <input type="button" value="Edit" class="Bottone" path="Edit"/></a>
        </td>

        <td>
          <a href="<c:url value='/remove-${res.id}'/>"> <input type="button" value="X" class="Bottone" path="remove"/></a>
        </td>
      </tr>
    </c:forEach>

  </table>
        <%---------------------- Table per la paginazione --------------------%>
      <table  class="lungTab">
          <tr class="trPage">
              <%------------- Select per il numero di utenti da visualizzare per pagina---------------%>
              <td class="tdSize">
                  Show: <select name="totalUserPage" class="sel" onchange="this.form.submit()" id="totalUserPage">
                  <c:choose>
                      <c:when test="${totalUserPage == 5}">
                      <option selected>5</option>
                      <option>10</option>
                      <option>50</option>
                      <option>100</option>
                     </c:when>
                      <c:when test="${totalUserPage == 10}">
                      <option>5</option>
                      <option selected>10</option>
                      <option>50</option>
                      <option>100</option>
                      </c:when>
                      <c:when test="${totalUserPage == 50}" >
                      <option>5</option>
                      <option >10</option>
                      <option selected>50</option>
                      <option>100</option>
                      </c:when>
                      <c:when test="${totalUserPage == 100}" >
                      <option>5</option>
                      <option >10</option>
                      <option>50</option>
                      <option selected>100</option>
                      </c:when>
                  <c:otherwise>
                  </c:otherwise>
                  </c:choose>
              </select> entries
              </td>

              <td class="tdSize" >
                  Displaying <p id="presentPage"> ${(presentPage ==1) ? presentPage*number : (presentPage*number)+1}</p> to <p id="totalPage">${(number==totalPage) ? totalUser-resto : totalUserPage*number}</p> of <p id="totalUser">${totalUser}</p> items
                  <input hidden type="number" value="${presentPage}" id="presentPageInput">
                  <input hidden type="number" value="${totalPage}" id="totalPageInput">
                  <input hidden type="number" value="${totalUser}" id="totalUserInput">
              </td>
              <td class="tdBotton">
                  <input type="${(presentPage > 1)? 'button': 'hidden'}"  value="<<" class="ButtonPage" name="begin" id="begin" onclick="Begin(this)"/>
              </td>
              <td class="tdBotton">
                  <input type="${(presentPage > 1)? 'button': 'hidden'}"  value="<" class="ButtonPage" name="back" id="back" onclick="Back(this)"/>
              </td>
              <td class="tdBotton">
                  <input type="number" name="number" value="${(number != 0 )? number : '0'}" min="1" max="${totalPage}" class="number" id="number" onchange="this.form.submit()">

              </td>
              <td class="tdBotton">
                  <input type="${(presentPage < totalPage)? 'button': 'hidden'}"  value=">" class="ButtonPage" name="next" id="next" onclick="Next(this)"/>
              </td>
              <td class="tdBotton">
                  <input type="${(presentPage < totalPage)? 'button': 'hidden'}"  value=">>" class="ButtonPage" name="end" id="end" onclick="End(this)"/>
              </td>

          </tr>




      </table>
  </form>

  <a href="<c:url value='/viewuser-0'/>"><input type="button"  value="+" class="pl" path="plus"/></a>


  </body>
</html>
