/**
 * WordPress dependencies
 */
import { ButtonBlockAppender, useBlockProps, useInnerBlocksProps, InspectorControls, store as slideshowStore } from '@wordpress/block-editor';
import { Button, ButtonGroup, PanelBody, SelectControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 *
 * @return {Element} Element to render.
 */
export default function Edit( {
	attributes: { autoplay, continuous, speed, transitionEffect },
	clientId,
	isSelected,
	setAttributes,
} ) {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(
		{ className: 'slider__wrapper' },
		{ allowedBlocks: [ 'core/cover', 'core/image', 'core/media-text' ] }
	);
	const { selectBlock } = useDispatch( slideshowStore );
	const [ currentSlideshow, setCurrentSlideshow ] = useState('');
	const [ currentSlide, setCurrentSlide ] = useState('');

	/**
	 * Get the slides for the current Slideshow
	 * @returns 
	 */
	const slideshow = useSelect(( select ) => {
		const newSlideshow = select( slideshowStore ).getBlocks( clientId );
		// If a new slide gets added, update the current slide to the new slide
		if ( currentSlideshow.length != newSlideshow.length ) {
			setCurrentSlideshow( newSlideshow );
			const newSlide = select( slideshowStore ).getSelectedBlock();
			if ( newSlide ) {
				setCurrentSlide( newSlide.clientId );
			}
		}
		return newSlideshow;
	});
	/**
	 * Set currentSlide to first slide
	 * Only runs when the page first loads
	 */
	if ( currentSlide.length == 0 && slideshow.length > 0 ) {
		setCurrentSlide(slideshow[0].clientId);
	}

	if ( isSelected && slideshow.length > 0 ) {
		if ( (currentSlide != slideshow[0].clientId) ) {
			setCurrentSlide(slideshow[0].clientId);
		}
	}

	/**
	 * Create the buttons that toggle between slides
	 * @param {*} slideshow 
	 * @returns 
	 */
	function createButtons(slideshow) {
		let myButtons = [];
		slideshow.forEach((slide, i) => {
			const slideId = slide.clientId;
			myButtons.push(
				<Button
					onClick={( element ) => {
						setCurrentSlide(slideId);
						selectBlock( slideId );
					}}
					className={ ( currentSlide == slideId ? 'active' : '' ) }
				>
					{'Slide ' + (i + 1)}
				</Button>
			);
		});

		return myButtons;
	}

	return (
		<div { ...blockProps }>
			<ButtonGroup>
				{ createButtons( slideshow ) }
				<ButtonBlockAppender rootClientId={ clientId } />
			</ButtonGroup>
			<div { ...innerBlockProps }></div>
			<InspectorControls>
				<PanelBody title={ __( 'Slider Controls' ) }>
					<SelectControl
						label='Transition Effect'
						value={ transitionEffect }
						options={ [
							{ label: 'Fade', value: 'fade' },
							{ label: 'Slide', value: 'slide' }
						] }
						onChange={ transitionEffect => setAttributes( { transitionEffect } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Continuous' ) }
						help={ __(
							'If enabled, the slider will loop back to the first slide after the last slide.'
						) }
						checked={ continuous }
						onChange={ () =>
							setAttributes( { continuous: ! continuous } )
						}
					/>
					<ToggleControl
						label={ __( 'Autoplay' ) }
						help={ __(
							'Set the slideshow to play automatically.'
						) }
						checked={ autoplay }
						onChange={ () =>
							setAttributes( { autoplay: ! autoplay } )
						}
					/>
					{ autoplay && (
						<NumberControl
							label={ __( 'Slide Duration' ) }
							help={ __(
								'The duration of each slide in seconds.'
							) }
							min={ 1 }
							max={ 10 }
							value={ speed }
							onChange={ ( newSpeed ) =>
								setAttributes( { speed: newSpeed } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
