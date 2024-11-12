import {
  Button,
  Label
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from "react-hook-form";
import { UseMutateFunction } from '@tanstack/react-query';

type EntityType =
  'adventure-splash-image' |
  'creature' |
  'magic-item' |
  'equipment-item' |
  'spell';

export interface ImageFormProps {
  entityId: string,
  entityType: EntityType;
  updateFunction: UseMutateFunction<unknown, Error, {
    entityType: EntityType;
    id: string;
    formData: FormData;
  }>;
  uploadIsError: boolean;
}

type ImageFormInputs = {
  image: File | null;
}

export const ImageForm = ({
  entityId,
  entityType,
  updateFunction,
  uploadIsError
}: ImageFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch
  } = useForm<ImageFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });
  
  const watchImage = watch('image', null);

  const onSubmit: SubmitHandler<ImageFormInputs> = data => {
    const {
      image
    } = data;

    if (image) {
      const formData = new FormData();

      formData.append('image', image);
  
      const payload = {
        entityType,
        id: entityId,
        formData
      };
  
      updateFunction(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Controller
          control={control}
          name="image"
          render={() => {
            const error: string = errors['image']?.message ?? '';

            return (
              <>
                <Label
                  error={error}
                  inputId="image"
                  label="Image"
                  required
                />
                <div>
                  <input
                    accept="image/png, image/jpeg"
                    id="image"
                    name="image"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue('image', file);
                        trigger();

                      } else {
                        setValue('image', null);
                      }
                    }}
                    type="file"
                  />
                </div>
                {
                  error ? (
                    <p
                      className="dm-screen-design-system-input-error-message"
                      data-test-id="dm-screen-design-system-input-error-message"
                      role="alert">
                      {error}
                    </p>
                  ): null
                }
              </>
            )
          }}
          rules={{
            required: {
              value: true,
              message: 'An image is required'
            }
          }}
        />
      </fieldset>
      <div>
        {
          watchImage ? (
            <img
              src={URL.createObjectURL(watchImage)}
              style={{
                maxWidth: '100%'
              }}/>
          ) : null
        }
      </div>
      {
        uploadIsError ? (
          <p>
            There was a problem uploading this image
          </p>
        ) : null
      }
      <fieldset>
        <Button
          buttonText="Upload image"
          disabled={!isValid}
        />
      </fieldset>
    </form>
  );
};
