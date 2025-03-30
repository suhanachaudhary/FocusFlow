import Navbar from "./components/ui/navigation/Navbar";
import Container from "./layouts/containers/Container";
import Logo from "./assets/logo.png";

function FlashApp() {
  return (
    <div data-testid="appDiv" className="bg-slate-100 min-h-screen pb-10">
      <Navbar Logo={Logo} />
      <Container />
    </div>
  );
}

export default FlashApp;
