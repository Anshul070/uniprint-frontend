import React, { useContext, useState } from 'react'
import { StatpdfCards } from './StatsPdfCards'
import { shopData } from '../../context/shopContext';
import { PrintCard} from './PrintCard';

function Body() {
  const [pagesInMachine, setPagesInMachine] = useState(0);
  const {fetchData, handleManualRefetch } = useContext(shopData);
  const data = fetchData;
  const types = [
    {
      type: "blackAndWhiteSingleSided",
      title: "Black and White (Single Sided)",
      pages : "totalPagesBlackAndWhite"
    },
    {
      type: "coloredSingleSided",
      title: "Colored (Single Sided)",
      pages : "totalPagesColored"
    },
    {
      type: "blackAndWhiteDoubleSided",
      title: "Black and White (Double Sided)",
      pages : "totalPagesBlackAndWhite"
    },
    {
      type: "coloredDoubleSided",
      title: "Colored (Double Sided)",
      pages : "totalPagesColored"
    }
  ]

  return (
    <div className="px-4 grid gap-3 grid-cols-12">
        <StatpdfCards data={data} setPagesInMachine={setPagesInMachine} pagesInMachine={pagesInMachine} />
        {
          types.map((type, index) => (
            <PrintCard data={data} handleManualRefetch={handleManualRefetch} type={type} key={index} setPagesInMachine={setPagesInMachine} pagesInMachine={pagesInMachine}/>
          ))
        }

    </div>
  )
}

export default Body