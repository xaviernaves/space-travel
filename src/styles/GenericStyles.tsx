import styled from "@emotion/styled";

type CheckOrRadio = {
	type: "checkbox" | "radio";
};
export const CheckInputContainer = styled.div<CheckOrRadio>`
	width: ${(props) => (props.type === "checkbox" ? "25px" : "28px")};
	height: 24px;
	position: relative;

	&::before {
		content: "";
		border-radius: ${(props) => (props.type === "checkbox" ? "0" : "100%")};
		border: 2px solid #ddd;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		pointer-events: none;
		z-index: 0;
	}

	@media (min-width: 1024px) {
		width: 26px;
	}
`;

export const CheckInput = styled.input`
	opacity: 0;
	z-index: 2;
	position: absolute;
	width: 100%;
	height: 100%;
	margin: 0;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	&:checked {
		& ~ div {
			border: solid white;
			border-width: 0 2px 2px 0;

			&::before {
				opacity: 1;
			}
		}
	}
`;

export const Check = styled.div`
	width: 0;
	height: 0;
	position: absolute;
	pointer-events: none;
	z-index: 1;

	left: 12px;
	top: 6px;
	width: 6px;
	height: 13px;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
`;

export const Separator = styled.div`
	margin: 24px 0px;
	width: 100%;
	height: 1px;
	background-color: white;
`;

export const Gradient: string = `
background: linear-gradient(
    90deg,
    #ffffff 0%,
    #fff3f0 20%,
    rgba(255, 61, 0, 0.8) 100%
);
background-size: 100%;
-webkit-background-clip: text;
-moz-background-clip: text;
-webkit-text-fill-color: transparent;
-moz-text-fill-color: transparent;
`;

export const InputContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
`;

export const InputLabel = styled.label`
	margin-bottom: 8px;
`;

export const TextInput = styled.input`
	color: white;
	width: 100%;
	font-size: 1rem;
	padding: 12px 16px;
	border: 1px solid #ffffff;
	border-radius: 2px;
	background: transparent;

	&::placeholder {
		color: rgba(255, 255, 255, 0.4);
		font-style: italic;
	}

	@media (min-width: 1024px) {
		max-width: 400px;
	}
`;

export const SelectContainer = styled.div`
	position: relative;
	width: 100%;

	&::after {
		pointer-events: none;
		content: "";
		top: 9px;
		right: 16px;
		position: absolute;
		border: solid white;
		opacity: 0.8;
		display: inline-block;
		padding: 5px;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	@media (min-width: 1024px) {
		max-width: 400px;
	}
`;

export const SelectInput = styled.select`
	color: white;
	height: 38px;
	width: 100%;
	font-size: 1rem;
	padding: 0 16px;
	border: 1px solid #ffffff;
	border-radius: 2px;
	background: transparent;
	appearance: none;

	&:invalid {
		color: rgba(255, 255, 255, 0.4);
		font-style: italic;
	}

	@media (min-width: 1024px) {
		max-width: 400px;
	}
`;

export const SelectOption = styled.option`
	color: white;
	background: #343434;
	font-style: normal;

	&[value=""] {
		color: rgba(255, 255, 255, 0.4);
		font-style: italic;
	}
`;

export const Error = styled.p`
	margin: 8px 0;
	color: #ff535d;
`;

export const H2 = styled.h2`
	text-align: center;
	width: 100%;
	font-family: Orion;
	font-weight: bold;
	font-size: 2.4rem;
	${Gradient}
	@media (min-width: 1024px) {
		font-size: 3.8rem;
	}
`;

export const Price = styled.h2`
	font-size: 1.2rem;
	font-weight: normal;
	line-height: 1;
	margin: 8px 0;
	color: #ffc400;

	@media (min-width: 1024px) {
		font-size: 1.5rem;
		font-weight: bold;
	}
`;