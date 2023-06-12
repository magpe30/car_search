import { CarCard, CustomFilter, Hero, SearchBar } from '@/components';
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from '@/types';
import { fetchData } from '@/utils';

export default async function Home({ searchParams }: HomeProps) {

  const allData = await fetchData({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  console.log(allData);
  const isDataEmpty = !Array.isArray(allData) || allData.length < 1 || !allData;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width searchbar__container' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>
      </div>
      {
        !isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {
                allData?.map((car, index) => (
                  <CarCard car={car} key={index} />
                ))
              }
            </div>
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allData?.message}</p>
          </div>
        )
      }
    </main>
  )
}
