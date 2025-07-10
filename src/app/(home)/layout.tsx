import { Header } from './components/header';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
