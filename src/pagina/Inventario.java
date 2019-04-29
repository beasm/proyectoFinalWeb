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
		// Utiliza el método getObjects() para obtener la colección
		// de todas las categorias.
		// Recorre la colección objetos Categoría recuperados.
		// y completa la página dinámica con la información del inventario.
		flujoEscritura.append("hola");

		flujoEscritura.append("</body></html>");

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	@Override
	public void destroy() {
		// Cierra la conexión con la base de datos ALMACEN.DB.
		super.destroy();
	}
}
