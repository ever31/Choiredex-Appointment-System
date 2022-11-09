import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_TREATMENT_MASK_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Evening/TreatmentMask/ProductName/ACTION_TREATMENT_MASK_PRODUCT_NAME";
import ACTION_TREATMENT_MASK_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Evening/TreatmentMask/ProductFrequency/ACTION_TREATMENT_MASK_PRODUCT_FREQUENCY";
import ACTION_TREATMENT_MASK_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Evening/TreatmentMask/ProductUseNotes/ACTION_TREATMENT_MASK_PRODUCT_USE_NOTES";
import ACTION_TREATMENT_MASK_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Evening/TreatmentMask/ProductLink/ACTION_TREATMENT_MASK_PRODUCT_LINK";
import ACTION_RESET_ALL_TREATMENT_MASK_FIELDS from "../../../../../../actions/MyRoutine/Evening/TreatmentMask/ACTION_RESET_ALL_TREATMENT_MASK_FIELDS";

const EveningTreatmentMask = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const treatmentMaskProductFrequency = useSelector(
    (state) =>
      state.treatmentMaskProductFrequency.treatment_mask_product_frequency
  );
  const treatmentMaskProductLink = useSelector(
    (state) => state.treatmentMaskProductLink.treatment_mask_product_link
  );
  const treatmentMaskProductName = useSelector(
    (state) => state.treatmentMaskProductName.treatment_mask_product_name
  );
  const treatmentMaskProductUseNotes = useSelector(
    (state) =>
      state.treatmentMaskProductUseNotes.treatment_mask_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_TREATMENT_MASK_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_TREATMENT_MASK_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_TREATMENT_MASK_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_TREATMENT_MASK_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_TREATMENT_MASK_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_evening_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "evening_treatment_mask")}
      ref={props.individualItemEveningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <g stroke="#000" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M28.437 47.19c-.209-.045-1.748-.542-3.42-1.104-3.915-1.316-5.443-1.618-8.21-1.622-2.689-.005-4.421-.34-5.949-1.155-4.676-2.492-6.003-10.143-3.224-18.596 2.262-6.883 5.24-12.42 9.144-17.009 1.438-1.69 2-2.135 2.306-1.829.136.137-.165.585-.976 1.452-1.644 1.757-3.256 3.946-3.256 4.422 0 .22.3.897.665 1.503.65 1.078.84 1.767.49 1.767-.098 0-.441-.462-.764-1.026-.917-1.604-1.083-1.565-2.335.55-1.948 3.293-3.734 7.449-4.793 11.154-.929 3.248-1.063 4.04-1.218 7.177-.113 2.319-.09 2.805.153 3.088.369.43.603.422 1.41-.054.986-.581 1.003-.135.026.666-.604.494-.853.84-.853 1.181 0 .762 1.046 2.739 1.924 3.635 1.726 1.764 3.443 2.31 7.29 2.314 2.9.004 4.659.372 9.025 1.892 2.694.937 2.804.958 4.94.956 1.202-.002 2.308-.08 2.458-.175.23-.145.237-.331.048-1.151-.124-.538-.226-1.193-.226-1.455 0-.768.463-.41.58.449.136 1.006.646 1.766 1.182 1.766.878 0 2.823-1.13 4.008-2.328 1.341-1.356 2.137-2.755 2.951-5.186.617-1.843 1.44-6.035 1.27-6.475-.12-.312-2.05-1.212-3.394-1.582-.943-.26-1.227-.469-.905-.668.239-.147 1.461.174 3.032.798 1.17.464 1.228.47 1.473.136.394-.54.712-.057.66 1.006-.075 1.585-1.14 6.43-1.75 7.97-1.686 4.25-4.254 6.556-8.197 7.36-1.338.273-4.63.375-5.565.173zm-7.264-11.654c-3.654-.51-6.023-1.69-5.664-2.822.54-1.703 8.557-1.04 11.335.939.703.5.726 1.189.054 1.629-.581.38-3.795.523-5.725.254zm5.22-.417c1.737-.83-.603-2.197-4.986-2.912-2.847-.464-5.008-.25-5.49.542-.176.291-.102.438.455.909.904.763 2.823 1.297 6.365 1.77.986.131 3.11-.048 3.656-.31zm17.384-5.47c-.173-.277-.205-.959-.118-2.518.294-5.258-.944-11.223-3.179-15.316-.958-1.755-1.592-2.61-3.06-4.127-1-1.033-1.087-1.182-.812-1.41.27-.223.453-.102 1.463.965 3.173 3.355 5.339 8.308 6.058 13.855.253 1.953.276 7.557.034 8.408-.143.504-.158.51-.386.144zm-22.552-.127c-.623-.15-1.251-.372-1.397-.494-.471-.39-.623-1.083-.412-1.869.297-1.1.678-.954.668.256-.007.958.02 1.01.67 1.33.374.182 1.193.385 1.82.45 1.086.114 1.163.094 1.555-.404.227-.289.412-.77.412-1.07 0-.356.098-.543.285-.543.342 0 .373.64.075 1.497-.391 1.121-1.49 1.375-3.676.847zm10.982-4.254c-3.05-.535-4.635-1.858-4.338-3.618.265-1.568 1.971-2.208 4.463-1.674.54.116 1.197.418 1.482.682.408.377.435.446.132.34-1.348-.473-2.6-.688-3.591-.617-.931.067-1.197.168-1.568.6-.845.982-.498 2.172.83 2.844 3.26 1.651 6.134 1.307 6.134-.736 0-.317.087-.474.237-.425.363.12.39.812.056 1.458-.539 1.041-1.979 1.472-3.837 1.146zm-16.303-3.119c-1.615-.433-2.043-1.53-1.19-3.046.556-.985 1.803-1.476 3.4-1.337 2.987.26 4.03 1.866 2.32 3.576-1.037 1.037-2.623 1.32-4.53.807zm3.639-.663c1.293-.788 1.547-2.015.567-2.744-.422-.313-.87-.411-2.09-.456-1.833-.067-2.63.295-3.094 1.405-.355.85-.204 1.334.56 1.8.85.518 3.203.516 4.057-.005zM34.45 5.341c-2.571-1.566-6.22-2.31-9.453-1.93-1.865.22-2.952.615-4.213 1.528-.858.622-1.374.74-1.374.317 0-.371 1.115-1.175 2.614-1.885l1.281-.607 3.42.006c3.176.005 3.532.042 4.985.511 1.58.51 3.815 1.642 4.228 2.14.216.26.12.675-.152.66-.072-.003-.673-.336-1.336-.74z"
              strokeWidth=".95"
            />
            <path
              d="M33.771 21.123c.152.065.305.126.46.183.047.017.084.052.13.07.065.04.122.087.184.13l.227.165c.14.113.264.243.38.378.1.128.19.261.261.406.046.081.078.168.1.257l.003.018.615-.332a1.293 1.293 0 00-.116-.285 2.514 2.514 0 00-.272-.42 4.292 4.292 0 00-.383-.393c-.074-.059-.154-.11-.23-.168-.061-.043-.12-.09-.18-.135-.043-.032-.101-.045-.143-.08-.157-.051-.888.28-1.036.206-.547-.463.19-.132 0 0z"
              strokeWidth=".661"
            />
          </g>
        </svg>
      </div>
      <h2>Treatment Mask</h2>
      <FontAwesomeIcon
        className="skin_care_routine_user_add_icon"
        icon={faPlusCircle}
      />
      <Transition
        items={props.itemToggled}
        from={{ transform: "translateX(-100%)" }}
        enter={{ transform: "translateX(0%)" }}
        leave={{ transform: "translateX(-100%)" }}
        config={{ duration: 200 }}
      >
        {(itemToggled) =>
          itemToggled === "evening_treatment_mask" &&
          ((styleprops) => (
            <div
              className="my_individual_selected_item_container"
              style={styleprops}
            >
              <div className="my_individual_selected_item_contents_container">
                <div className="my_individual_selected_item_top_container">
                  <div
                    className="my_individual_selected_item_back_container"
                    ref={props.selectedItemBackRef}
                    onClick={(e) => props.handleAppointmentUntoggled(e)}
                  >
                    <FontAwesomeIcon
                      icon={faLongArrowAltLeft}
                      className="my_individual_selected_item_back_arrow_icon"
                    />
                  </div>
                </div>
                <div className="my_individual_selected_item_header">
                  <p>Treatment Mask</p>
                </div>
              </div>
              {props.addProductClicked ? (
                <div className="my_individual_selected_item_add_product_container">
                  <Form className="add_product_form">
                    <FormGroup className="add_product_form_field">
                      <Label for="productName">
                        {" "}
                        <div className="top_form_container">Product Name</div>
                      </Label>
                      <Input
                        type="text"
                        name="productName"
                        maxLength={50}
                        placeholder="Enter product name"
                        className="input_field_product"
                        defaultValue={treatmentMaskProductName}
                        onChange={handleProductName}
                      />
                    </FormGroup>
                    <FormGroup className="add_product_form_field">
                      <Label for="frequencyOfUse">
                        {" "}
                        <div className="top_form_container">
                          Frequency of Use
                        </div>
                      </Label>
                      <Input
                        type="text"
                        name="frequencyOfUse"
                        maxLength={50}
                        placeholder="Enter frequency, e.g. daily, etc."
                        className="input_field_product"
                        defaultValue={treatmentMaskProductFrequency}
                        onChange={handleProductFrequency}
                      />
                    </FormGroup>
                    <FormGroup className="add_product_form_field">
                      <Label for="productUsageDetails">
                        Product Usage Details
                      </Label>
                      <Input
                        type="textarea"
                        style={{
                          fontFamily: "Montserrat",
                        }}
                        placeholder="Enter a short description of your product usage here."
                        className="product_usage_notes"
                        maxLength={1000}
                        defaultValue={treatmentMaskProductUseNotes}
                        onChange={handleProductUsageDetails}
                      />
                    </FormGroup>
                    <FormGroup className="add_product_form_field">
                      <Label for="productLink">
                        {" "}
                        <div className="top_form_container">Product Link</div>
                      </Label>
                      <Input
                        type="text"
                        name="productLink"
                        maxLength={50}
                        placeholder="Enter a URL link to the product"
                        className="input_field_product"
                        defaultValue={treatmentMaskProductLink}
                        onChange={handleProductLink}
                      />
                    </FormGroup>
                  </Form>
                  <div className="my_individual_selected_item_bottom_buttons_container">
                    <div
                      className="my_individual_selected_item_add_product_button"
                      ref={props.submitProductRef}
                      onClick={(e) => props.handleAddProductToggle(e)}
                    >
                      <p>Submit Product</p>
                    </div>
                    <div
                      className="my_individual_selected_item_back_to_routine_button"
                      onClick={() => props.handleBackToOverview()}
                    >
                      <p>Back to Overview</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my_individual_selected_item_empty_state_container">
                  <div className="my_individual_selected_item_empty_state_icon_container">
                    <svg
                      className="my_individual_selected_item_empty_state_icon"
                      height="5rem"
                      width="100%"
                      viewBox="0 0 50.006 50.006"
                    >
                      <g strokeLinecap="round" strokeLinejoin="round">
                        <path
                          d="M28.437 47.19c-.209-.045-1.748-.542-3.42-1.104-3.915-1.316-5.443-1.618-8.21-1.622-2.689-.005-4.421-.34-5.949-1.155-4.676-2.492-6.003-10.143-3.224-18.596 2.262-6.883 5.24-12.42 9.144-17.009 1.438-1.69 2-2.135 2.306-1.829.136.137-.165.585-.976 1.452-1.644 1.757-3.256 3.946-3.256 4.422 0 .22.3.897.665 1.503.65 1.078.84 1.767.49 1.767-.098 0-.441-.462-.764-1.026-.917-1.604-1.083-1.565-2.335.55-1.948 3.293-3.734 7.449-4.793 11.154-.929 3.248-1.063 4.04-1.218 7.177-.113 2.319-.09 2.805.153 3.088.369.43.603.422 1.41-.054.986-.581 1.003-.135.026.666-.604.494-.853.84-.853 1.181 0 .762 1.046 2.739 1.924 3.635 1.726 1.764 3.443 2.31 7.29 2.314 2.9.004 4.659.372 9.025 1.892 2.694.937 2.804.958 4.94.956 1.202-.002 2.308-.08 2.458-.175.23-.145.237-.331.048-1.151-.124-.538-.226-1.193-.226-1.455 0-.768.463-.41.58.449.136 1.006.646 1.766 1.182 1.766.878 0 2.823-1.13 4.008-2.328 1.341-1.356 2.137-2.755 2.951-5.186.617-1.843 1.44-6.035 1.27-6.475-.12-.312-2.05-1.212-3.394-1.582-.943-.26-1.227-.469-.905-.668.239-.147 1.461.174 3.032.798 1.17.464 1.228.47 1.473.136.394-.54.712-.057.66 1.006-.075 1.585-1.14 6.43-1.75 7.97-1.686 4.25-4.254 6.556-8.197 7.36-1.338.273-4.63.375-5.565.173zm-7.264-11.654c-3.654-.51-6.023-1.69-5.664-2.822.54-1.703 8.557-1.04 11.335.939.703.5.726 1.189.054 1.629-.581.38-3.795.523-5.725.254zm5.22-.417c1.737-.83-.603-2.197-4.986-2.912-2.847-.464-5.008-.25-5.49.542-.176.291-.102.438.455.909.904.763 2.823 1.297 6.365 1.77.986.131 3.11-.048 3.656-.31zm17.384-5.47c-.173-.277-.205-.959-.118-2.518.294-5.258-.944-11.223-3.179-15.316-.958-1.755-1.592-2.61-3.06-4.127-1-1.033-1.087-1.182-.812-1.41.27-.223.453-.102 1.463.965 3.173 3.355 5.339 8.308 6.058 13.855.253 1.953.276 7.557.034 8.408-.143.504-.158.51-.386.144zm-22.552-.127c-.623-.15-1.251-.372-1.397-.494-.471-.39-.623-1.083-.412-1.869.297-1.1.678-.954.668.256-.007.958.02 1.01.67 1.33.374.182 1.193.385 1.82.45 1.086.114 1.163.094 1.555-.404.227-.289.412-.77.412-1.07 0-.356.098-.543.285-.543.342 0 .373.64.075 1.497-.391 1.121-1.49 1.375-3.676.847zm10.982-4.254c-3.05-.535-4.635-1.858-4.338-3.618.265-1.568 1.971-2.208 4.463-1.674.54.116 1.197.418 1.482.682.408.377.435.446.132.34-1.348-.473-2.6-.688-3.591-.617-.931.067-1.197.168-1.568.6-.845.982-.498 2.172.83 2.844 3.26 1.651 6.134 1.307 6.134-.736 0-.317.087-.474.237-.425.363.12.39.812.056 1.458-.539 1.041-1.979 1.472-3.837 1.146zm-16.303-3.119c-1.615-.433-2.043-1.53-1.19-3.046.556-.985 1.803-1.476 3.4-1.337 2.987.26 4.03 1.866 2.32 3.576-1.037 1.037-2.623 1.32-4.53.807zm3.639-.663c1.293-.788 1.547-2.015.567-2.744-.422-.313-.87-.411-2.09-.456-1.833-.067-2.63.295-3.094 1.405-.355.85-.204 1.334.56 1.8.85.518 3.203.516 4.057-.005zM34.45 5.341c-2.571-1.566-6.22-2.31-9.453-1.93-1.865.22-2.952.615-4.213 1.528-.858.622-1.374.74-1.374.317 0-.371 1.115-1.175 2.614-1.885l1.281-.607 3.42.006c3.176.005 3.532.042 4.985.511 1.58.51 3.815 1.642 4.228 2.14.216.26.12.675-.152.66-.072-.003-.673-.336-1.336-.74z"
                          strokeWidth=".95"
                        />
                        <path
                          d="M33.771 21.123c.152.065.305.126.46.183.047.017.084.052.13.07.065.04.122.087.184.13l.227.165c.14.113.264.243.38.378.1.128.19.261.261.406.046.081.078.168.1.257l.003.018.615-.332a1.293 1.293 0 00-.116-.285 2.514 2.514 0 00-.272-.42 4.292 4.292 0 00-.383-.393c-.074-.059-.154-.11-.23-.168-.061-.043-.12-.09-.18-.135-.043-.032-.101-.045-.143-.08-.157-.051-.888.28-1.036.206-.547-.463.19-.132 0 0z"
                          strokeWidth=".661"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No treatment mask information</h2>
                    <p>
                      Start by adding some product information and check back
                      here after
                    </p>
                  </div>
                  <div className="my_individual_selected_item_bottom_buttons_container">
                    <div
                      className="my_individual_selected_item_add_product_button"
                      ref={props.addProductRef}
                      onClick={(e) => props.handleAddProductToggle(e)}
                    >
                      <p>Add Product</p>
                    </div>
                    <div
                      className="my_individual_selected_item_back_to_routine_button"
                      onClick={() => props.changeItemToggled("")}
                    >
                      <p>Back to Routine</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        }
      </Transition>
    </div>
  );
});

export default EveningTreatmentMask;
