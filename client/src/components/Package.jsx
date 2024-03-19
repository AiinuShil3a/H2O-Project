import React from 'react'

const Package = () => {
    return (
        <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
            <div className="container">
                {/* //ส่วนหัว */}
                <header className='p-2 rounded-[15px] mr-4  '>
                    <h5>ที่พักและแพ็คเกจที่แนะนำ</h5>
                </header>

                <div className="flex items-center  mt-4">
          <div className="relative">
            <button
              className="bg-primaryUser text-white p-2 mr-2 rounded-[15px]"
            >
              ที่พัก
            </button>
          </div>
          <div className="relative">
            <button
              className="bg-primaryUser text-white p-2 rounded-[15px]"
            >
              แพ็คเกจ
            </button>
          </div>
        </div>

                <main>

                    <section className="hotels">
                        <h2 className='p-5 rounded-[15px] mr-4'></h2>
                        <ul>
                            <li>
                                <img src="https://www.krabiview.com/th/wp-content/uploads/2015/07/tub-island-attraction-thailand-0.jpg "
                                 alt="Hotel 1" />
                                
                                <h2> ทะเลแหวก (Thale Waek / Seperate Sea)</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                    egestas elit ac purus tincidunt, vitae hendrerit nisl
                                    consectetur.
                                </p>
                            </li>
                            <li>
                                <img src="https://www.krabiview.com/th/wp-content/uploads/2015/07/tub-island-attraction-thailand-0.jpg" 
                                alt="Hotel 2" />
                                <h3>Monastero Santa Rosa Hotel & Spa</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                    egestas elit ac purus tincidunt, vitae hendrerit nisl
                                    consectetur.
                                </p>
                            </li>
                        </ul>
                    </section>
                    <section className="packages">
                        <h2>แพ็คเกจ</h2>
                        <ul>
                            <li>
                                <h3>แพ็คเกจพักผ่อนสุดคุ้ม</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                    egestas elit ac purus tincidunt, vitae hendrerit nisl
                                    consectetur.
                                </p>

                            </li>
                            <li>
                                <h3>แพ็คเกจโรแมนติก</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                    egestas elit ac purus tincidunt, vitae hendrerit nisl
                                    consectetur.
                                </p>

                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Package