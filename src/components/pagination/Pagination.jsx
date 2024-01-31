// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


export default function Pagination(props) {
    const totalPages = Math.ceil(props.dataCount/props.perPage);
    const renderLinks = () => {

        const items = [];
        let dotCnt1 = 0;
        let dotCnt2 = 0;

       

        for (let index = 1; index <= totalPages; index++) {
            const isCurrentPage = props.page === index;
            const isWithinRange1 = index < props.page - 1 && index > 1;
            const isWithinRange2 = index > props.page + 1 && index < totalPages ;

            if (isCurrentPage) {
                items.push(
                    <button type="button"
                        key={`page-${index}`}
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        
                    >
                        {index}
                    </button>
                );
            }
            else if (totalPages > 5) {
                if (isWithinRange1) {
                    if (dotCnt1 < 1) {
                        items.push(
                            <span
                                key={`dot1-${index}`}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                            >
                                ...
                            </span>
                        );
                        dotCnt1++;
                    }
                } else if (isWithinRange2) {
                    if (dotCnt2 < 1) {
                        items.push(
                            <span
                                key={`dot2-${index}`}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                            >
                                ...
                            </span>
                        );
                        dotCnt2++;
                    }
                }
                else {
                    items.push(
                        <button type="button"
                            key={`page-${index}`}
                            aria-current="page"
                            className="relative  items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 inline-flex"
                            onClick={()=>{props.changePage(index)}}
                        >
                            {index}
                        </button>
                    );
                }

            }
            else {
                items.push(
                    <button type="button"
                        key={`page-${index}`}
                        aria-current="page"
                        className="relative  items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0 inline-flex"
                        onClick={()=>{props.changePage(index)}}
                    >
                        {index}
                    </button>
                );
            }
        }


        return items;
    }
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-sm">
            <div className="flex flex-1 justify-between gap-1 sm:hidden">
                <button type="button"
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 sm:px-4 py-2 text-sm font-medium  ${props.page===1?'text-gray-400':'text-gray-700'} hover:bg-gray-50`}
                    onClick={props.prevPage} disabled={props.page===1?true:false}
                >
                    Previous
                </button>

                <div className="inline-block shrink-0 relative">
                    <select title="per_page" name="per_page" className=" block appearance-none w-full bg-white border px-2 sm:px-4 py-2 pr-4 sm:pr-8 rounded shadow leading-tight focus:outline-blue-400 focus:shadow-outline" onChange={(ele)=>{
                        
                        props.changePerPage(ele.target.value);
                        
                        }} value={props.perPage}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>


                <button type="button"
                    className={`relative  inline-flex items-center rounded-md border border-gray-300 bg-white px-2 sm:px-4 py-2 text-sm font-medium ${props.page===totalPages?'text-gray-400':'text-gray-700'} hover:bg-gray-50`}
                    onClick={props.nextPage} disabled={props.page===totalPages?true:false}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-wrap sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{((props.page-1)*props.perPage)+1}</span> to <span className="font-medium">{Math.min(((props.page-1)*props.perPage)+props.perPage,props.dataCount)}</span> of{' '}
                        <span className="font-medium">{props.dataCount}</span> results
                    </p>
                </div>
                <div className="inline-block relative">
                    <select className="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-blue-400 focus:shadow-outline" onChange={(ele)=>{props.changePerPage(ele.target.value)}} value={props.perPage}>
                    <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button type="button" disabled={props.page===1?true:false}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0"
                            onClick={props.prevPage}
                        >
                            <span className="sr-only">Previous</span>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                        {renderLinks()}



                        <button type="button" disabled={props.page===totalPages?true:false}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0"
                            onClick={props.nextPage} 
                        >
                            <span className="sr-only">Next</span>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}