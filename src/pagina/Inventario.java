package pagina;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Inventario")
public class Inventario extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Inventario() {
		super();
	}

	@Override
	public void init() throws ServletException {
//		if (this.getServletContext().getAttribute("OBS") == null) {
//			objCategorias = ODBFactory.open("C:/Users/casa/eclipse-workspace-datos/ActividadUF6-R/ALMACEN.DB");
//			this.getServletContext().setAttribute("OBS", objCategorias);
//		} else {
//			objCategorias = (ODB) this.getServletContext().getAttribute("OBS");
//		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter flujoEscritura = response.getWriter();
		flujoEscritura.append("<!DOCTYPE html>");
		flujoEscritura.append("<html><head><meta charset='UTF-8'>");
		flujoEscritura.append("<title>Inventario</title>");
		flujoEscritura.append("<link rel='stylesheet' type='text/css' href='css/estilo.css'>");
		flujoEscritura.append("</head><body>");
		// Utiliza el m�todo getObjects() para obtener la colecci�n
		// de todas las categorias.
		// Recorre la colecci�n objetos Categor�a recuperados.
		// y completa la p�gina din�mica con la informaci�n del inventario.
		flujoEscritura.append("hola");

		flujoEscritura.append("</body></html>");

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	@Override
	public void destroy() {
		// Cierra la conexi�n con la base de datos ALMACEN.DB.
		super.destroy();
	}
}
