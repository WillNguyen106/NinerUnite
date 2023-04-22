

function totalPriceOfItems (bookArr, techArr) {
        
  let totalBookPrice = 0;
  let totalTechPrice = 0;

  //calculate the total book price for each book, if the book exists
  if(bookArr.length > 0){

          bookArr.forEach(book => {

              //if it is null, that means it has been deleted
              if(book.bookId != null){
                  totalBookPrice += parseFloat(book.bookId.price);
              }

          });

      }else{
          totalBookPrice = 0;
      }

      //calculate the total tech price for each tech item, if the tech item exists
      if(techArr.length > 0){

          techArr.forEach(tech => {

              //if it is null, that means it has been deleted
              if(tech.techId != null){
                  totalTechPrice += parseFloat(tech.techId.price);
              }

          });

      }else{
          totalTechPrice = 0;
      }

      let roundedTotal = Math.round((totalBookPrice + totalTechPrice) * 100) / 100;

      return roundedTotal;

}

module.exports = totalPriceOfItems;