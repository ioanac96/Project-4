
export function request(searchValue, itemsPerPage, offset = 0)  {
    const req = new Request(`http://localhost:3001/v4/icons/search?query=${searchValue}&count=${itemsPerPage}&offset=${offset}`,
    {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer G3zkEbRdjqJ23BMXDvuN211zaw2CSa0nIKAtqQ8rCvc37lMZVkCouRrW6gaG3Ev3'
      }
    });
    return  (fetch(req).then((response) =>{
        return response.json();
      }));

}


export function getIcons(data) {
    let iconsArray = data.icons.map((current, index) => {
        let sizeLength = current.raster_sizes.length;
        let min = Math.min(5,sizeLength-1);
        return {
          image: current.raster_sizes[min].formats[0].preview_url,
          id: current.icon_id,
          tags: current.tags
        }
    });

    return iconsArray;
}