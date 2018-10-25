$(document).ready( ()=>{
	
	var people = [];
	var iPeople = 10;
	var planets = [];
	var iPlanets = 10;
	var type;
	
	$("button:nth-of-type(1)").on('click', ()=>{
		getData(people,0, type="people");
		$('span').show();
		$('span a:nth-of-type(2)').hide();
		$('span a:nth-of-type(3)').show();

	})
	
	$("button:nth-of-type(2)").on('click', ()=> {
		getData(planets,0, type="planets");
		$('span').show();
		$('span a:nth-of-type(2)').show();
		$('span a:nth-of-type(3)').hide();
	})
	
	$("span a:nth-of-type(1)").on('click', e =>{
		
		e.preventDefault();
		displayData(type, -10)
	})
	
	$("span a:nth-of-type(2)").on('click', e =>{
		
		e.preventDefault();
		displayData(type, 61)
	})
	
	$("span a:nth-of-type(3)").on('click', e =>{
		
		e.preventDefault();
		displayData(type, 87)
	})
	
	$("span a:nth-of-type(4)").on('click', e =>{
		
		e.preventDefault();
		displayData(type, 10)
	})
	
	const getData =  (list,next,type) => {

		return list.length == 0 || next != 0 ? 
			$.get(`/${type}/${next}`, function(data){
					
					data.results.forEach( p => list.push(p.name) );
					getData(list,data.next ? data.next.substr(data.next.length-1) : 0, type);
			}, 'json')
			: displayData(list, null);
	}
	
	const displayData = (data, next)=>{
		$('#results').html(null);
		
		var end = 0;
		
		if(next === null) end = 10;
		else if(type == "people"){
			data = people;
			if(next < 0) iPeople = end = iPeople + next < 10 ? 10 : iPeople + next;
			else iPeople = end = iPeople + next > 90 ? 87 : iPeople + next;			
		}
		else{
			data = planets;
			if(next < 0) iPlanets = end = iPlanets + next < 10 ? 10 : iPlanets + next;
			else iPlanets = end = iPlanets + next > 60 ? 61 : iPlanets + next;
		}
		
		for(let i = next > 10 ? 0 : end-10; i < end; i++){
			$('#results').append(`<p>${data[i]}</p>`);
		}
		
	}
	
})