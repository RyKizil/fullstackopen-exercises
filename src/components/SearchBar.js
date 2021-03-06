import React, {useState, useEffect} from 'react'

const SearchBar = ({persons}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      if(searchTerm.trim().length < 1 ) {
        setSearchResults([])
      } else {
        const results = persons.filter(person =>
          person.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
      }
        
      }, [searchTerm]);


      return (
          <>
        <div>
        filter shown with:
         <input
         type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div>
         {
            searchResults.map((person, i) => {
                return (
                    <p key={i}>{person.name} {person.number}</p>
                )
                })
         }
        </div>
        </>
      )
}

export default SearchBar;