import java.net.URL;

public class TestResource {
	public static void main(String[] a) {
		TestResource tr = new TestResource();
		ClassLoader cl = tr.getClass().getClassLoader();
		URL url = cl.getResource("..\\resources\\test.dat");
		System.out.println(url);
	}
}
