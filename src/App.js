import { useRef, useState } from 'react';

function App() {
	const storageJobs = JSON.parse(localStorage.getItem('jobs'))
	const [job, setJob] = useState('');
	const [jobs, setJobs] = useState(storageJobs ?? []);
	const [type, setType] = useState(jobs);
	console.log(type);
	const inputRef = useRef();



	const handleSearch = () => {

		setJobs(prev => {
			const newJobs = [...prev, job];

			// save to local state
			const jsonNewJobs = JSON.stringify(newJobs);
			localStorage.setItem('jobs', jsonNewJobs);

			return newJobs;
		});
		setJob('');
		inputRef.current.focus();
	}

	return (
		<div>
			<input
				ref={inputRef}
				value={job}
				onChange={(e) => setJob(e.target.value)}
			/>

			<button onClick={handleSearch}>Add</button>
			<ul>
				{jobs.map((job, index) => (
					<li
						style={type === job ? ({
							color: 'red'
						}) : ({})}
						key={index}
						onClick={() => setType(job)}
					>
						{job}
						<span>&times;</span>
					</li>
				))}
			</ul>

		</div>
	)
}

export default App;