import * as Yup from "yup";
import { Formik } from "formik";
import React, { ReactElement, useState } from "react";
import {
	Check,
	CheckInput,
	CheckInputContainer,
	Error,
	InputContainer,
	InputLabel,
	Price,
	SelectContainer,
	SelectInput,
	SelectOption,
	Separator,
	TextInput,
} from "../../styles/GenericStyles";
import { Extra, Shuttle } from "../../utils/types";
import { usePurchaseContext } from "../../context/PurchaseContext";
import { useRouter } from "next/dist/client/router";
import * as s from "../../styles/components/Shuttles/Form";

export type FormValues = {
	name: string;
	surname: string;
	seat: string;
	extras: string[];
};

const initialValues: FormValues = {
	name: "",
	surname: "",
	seat: "",
	extras: [],
};

const shoppingSchema = Yup.object().shape({
	name: Yup.string().min(2, "Name too short").required("Name is required"),
	surname: Yup.string()
		.min(2, "Surname too short")
		.required("Surname is required"),
	seat: Yup.string().required("A seat is required"),
});

interface Props {
	shuttle: Shuttle;
	extras: Extra[];
}

const Form = ({ shuttle, extras }: Props): ReactElement => {
	const router = useRouter();
	const [price, setPrice] = useState<number>(Number(shuttle.basePrice));
	const { updatePurchaseData } = usePurchaseContext();

	const calcPrice = (
		event: React.ChangeEvent<HTMLInputElement>,
		extra_price: string
	) => {
		if (event.target.checked) setPrice(price + Number(extra_price));
		else setPrice(price - Number(extra_price));
	};

	const submitForm = (values: FormValues) => {
		updatePurchaseData(values, shuttle, price);
		router.push("/purchase");
	};
	return (
		<Formik
			onSubmit={submitForm}
			validateOnChange={false}
			validateOnBlur={false}
			initialValues={initialValues}
			validationSchema={shoppingSchema}
		>
			{(formik) => {
				const { values, handleChange, handleSubmit, errors, handleBlur } =
					formik;
				return (
					<form noValidate onSubmit={handleSubmit}>
						<s.FormContainer>
							<s.FormDetails>
								<s.FormInputs>
									<InputContainer>
										<InputLabel htmlFor="name">Name</InputLabel>
										<TextInput
											name="name"
											id="name"
											placeholder="Write your name"
											value={values.name}
											onChange={handleChange}
										/>
										{errors.name && <Error>{errors.name}</Error>}
									</InputContainer>
									<InputContainer style={{ marginTop: 16 }}>
										<InputLabel htmlFor="surname">Surname</InputLabel>
										<TextInput
											name="surname"
											id="surname"
											placeholder="Write your surname"
											value={values.surname}
											onChange={handleChange}
										/>
										{errors.surname && <Error>{errors.surname}</Error>}
									</InputContainer>

									<InputContainer style={{ marginTop: 32 }}>
										<InputLabel>Select seat</InputLabel>
										<SelectContainer>
											<SelectInput
												name="seat"
												value={values.seat}
												onChange={handleChange}
												required
											>
												<SelectOption value="">Select a seat</SelectOption>
												{shuttle.availableSeats.map((seat, key) => (
													<SelectOption key={key} value={seat}>
														{seat}
													</SelectOption>
												))}
											</SelectInput>
										</SelectContainer>

										{errors.seat && <Error>{errors.seat}</Error>}
									</InputContainer>
								</s.FormInputs>
								<s.FormExtras>
									<s.ExtrasHeading>Choose some extras</s.ExtrasHeading>
									<s.ExtrasContainer>
										{extras.map((extra, key) => (
											<s.ExtraInner key={key}>
												<s.ExtraCheckbox>
													<CheckInputContainer type="checkbox">
														<CheckInput
															type="checkbox"
															name="extras"
															id={`extra_${extra.name}`}
															value={extra.name}
															onChange={(e) => {
																handleChange(e);
																calcPrice(e, extra.price);
															}}
														></CheckInput>
														<Check></Check>
													</CheckInputContainer>
													<s.ExtraName htmlFor={`extra_${extra.name}`}>
														{extra.name}
													</s.ExtraName>
												</s.ExtraCheckbox>
												<s.ExtraPrice price={Number(extra.price)}>
													{Number(extra.price) > 0 ? `${extra.price}₿` : "Free"}
												</s.ExtraPrice>
											</s.ExtraInner>
										))}
									</s.ExtrasContainer>
								</s.FormExtras>
							</s.FormDetails>
							<Separator />
							<s.FormFooter>
								<Price>Total: {price}₿</Price>
								<s.SubmitButton type="submit">Buy now</s.SubmitButton>
							</s.FormFooter>
						</s.FormContainer>
					</form>
				);
			}}
		</Formik>
	);
};

export default Form;
