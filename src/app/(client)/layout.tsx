import { Header } from './(home)/components/header';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="mt-[72px] xl:mt-[125px]">{children}</div>
    </>
  );
};

export default ClientLayout;
