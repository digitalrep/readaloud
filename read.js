
	var in_book;
	
	var words = [];
	var sections_array = [];
	var current = -1;
	var section_length = 5;
	
	const input_element = document.getElementById("uploaded_file");
	input_element.addEventListener("change", upload, false);	
		
	function manage_book(book) {
		words = book.split(".");
		current = -1;
		split_book(words, section_length);	
	}		
		
	function upload(event) {
		const fileList = event.target.files;

		console.log(fileList);
		
		var reader = new FileReader();
		reader.onload = function(e) {
			in_book = e.target.result;
			manage_book(in_book);
		}
		reader.readAsText(fileList[0]);
	}

	function read(repeat) {
		
		if(!repeat) {
			current++;
		}
		
		var text = sections_array[current];
		var msg = new SpeechSynthesisUtterance(text);
		window.speechSynthesis.speak(msg);	
		var span_id = "section" + String(current);
		var current_span = document.getElementById(span_id);
		current_span.classList.add("highlight");
	}
		
	function split_book(words, section_size) {
		document.getElementById("content").innerHTML = "";
	
		var num_sections = words.length / section_size;
		
		var section_index = 0;
		var words_index = 0;
		
		for(section_index=0; section_index<num_sections; section_index++) {
			var werds = words.slice(section_index*section_size, section_index*section_size + section_size);
			sections_array[section_index] = werds.join(". ");
		}

		for(var i=0; i<num_sections; i++) {
			var name = "section" + String(i);
			var sentence = sections_array[i];
			document.getElementById("content").innerHTML += `<span id="${name}">${sentence}. </span>`;
		}
	}