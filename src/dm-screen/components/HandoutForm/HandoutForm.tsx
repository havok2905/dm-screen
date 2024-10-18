import {
  Button,
  Input,
  Label
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from "react-hook-form";
import { UseMutateFunction } from '@tanstack/react-query';

export interface HandoutFormProps {
  adventureId: string,
  updateFunction: UseMutateFunction<unknown, Error, {
    id: string;
    formData: FormData;
  }>;
  uploadIsError: boolean;
}

type HandoutFormInputs = {
  description: string
  image: File | null;
  name: string
}

export const HandoutForm = ({
  adventureId,
  updateFunction,
  uploadIsError
}: HandoutFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch
  } = useForm<HandoutFormInputs>({
    mode: 'all'
  });

  const {
    errors,
    isValid
  } = useFormState({ control });
  
  const watchImage = watch('image', null);

  const onSubmit: SubmitHandler<HandoutFormInputs> = data => {
    const {
      description,
      image,
      name
    } = data;

    if (image) {
      const formData = new FormData();

      formData.append('description', description ?? '');
      formData.append('image', image);
      formData.append('name', name ?? '');
  
      const payload = {
       id: adventureId,
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
          name="name"
          render={({ field }) => {
            const error: string = errors['name']?.message ?? '';

            return (
              <Input
                error={error}
                full
                inputId="name"
                inputName="name"
                label="Name"
                required
                {...field}
              />
            )
          }}
          rules={{
            minLength: {
              value: 3,
              message: 'A name must be at least 3 characters.'
            },
            required: {
              value: true,
              message: 'A name is required'
            }
          }}
        />
      </fieldset>
      <fieldset>
        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            const error: string = errors['description']?.message ?? '';

            return (
              <Input
                error={error}
                full
                inputId="description"
                inputName="description"
                label="Description"
                required
                {...field}
              />
            )
          }}
          rules={{
            minLength: {
              value: 3,
              message: 'A description must be at least 3 characters.'
            },
            required: {
              value: true,
              message: 'A description is required'
            }
          }}
        />
      </fieldset>
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
              width="100%"/>
          ) : null
        }
      </div>
      {
        uploadIsError ? (
          <p>
            There was a problem uploading this handout
          </p>
        ) : null
      }
      <fieldset>
        <Button
          buttonText="Upload adventure handout"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        />
      </fieldset>
    </form>
  );
};
