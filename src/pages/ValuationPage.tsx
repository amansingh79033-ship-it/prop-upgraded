import { NotchNavbar, Footer } from '../sections';

export const ValuationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      <section className="py-32 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">Property Valuation</h1>
        <p className="text-xl text-text-secondary">Coming Soon - Get instant property valuation</p>
      </section>
      <Footer />
    </div>
  );
};
