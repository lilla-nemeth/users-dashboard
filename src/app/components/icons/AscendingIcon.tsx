function AscendingIcon(props: any) {
	const { className } = props;

	return (
		<svg
			className={className}
			clip-rule='evenodd'
			fill-rule='evenodd'
			stroke-linejoin='round'
			stroke-miterlimit='2'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='m8.656 5.778c0 .414.336.75.75.75h5.16c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-5.16c-.414 0-.75.336-.75.75zm-2.206 4c0 .414.336.75.75.75h9.596c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-9.596c-.414 0-.75.336-.75.75zm-2.45 4c0 .414.336.75.75.75h14.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75zm-2 4c0 .414.336.75.75.75h18.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75z'
				fill-rule='nonzero'
			/>
		</svg>
	);
}

export default AscendingIcon;