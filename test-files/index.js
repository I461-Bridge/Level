import React from 'react';
import Accordion from '/.components/Accordion'

const data  {
	name: "Lorem ipsum",
	description: "Sed ut perspiciatis unde omnis iste natus error inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
};

React.render(<Accordion name={data.name} description= {data.description} />, 
			 document.getElementById('app'));
