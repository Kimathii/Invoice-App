import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { invoiceSchema, type InvoiceFormValues } from "@/utils/invoiceSchema";
import { buildDefaults, EMPTY_ITEM } from "@/utils/invoiceHelpers";
import { PAYMENT_OPTIONS } from "@/constants/invoiceOptions";
import FormField from "@/components/ui/FormField";
import DatePicker from "@/components/ui/DatePicker";
import SelectField from "@/components/ui/SelectField";
import AddressSection from "./AddressSection";
import InvoiceItemRow from "./InvoiceItemRow";
import InvoiceFormActions from "./InvoiceFormActions";

export default function InvoiceForm() {
  const {
    editingInvoiceId,
    closeDrawer,
    addInvoice,
    updateInvoice,
    getInvoiceById,
  } = useInvoiceStore();
  const isEditing = Boolean(editingInvoiceId);
  const existingInvoice = editingInvoiceId
    ? getInvoiceById(editingInvoiceId)
    : undefined;

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: buildDefaults(existingInvoice),
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  useEffect(() => {
    reset(buildDefaults(existingInvoice));
  }, [editingInvoiceId, reset]);

  const watchedItems = watch("items");

  const onSubmit = (data: InvoiceFormValues) => {
    const items = data.items.map((item) => ({
      ...item,
      total: item.quantity * item.price,
    }));
    const payload = { ...data, items };

    if (isEditing && editingInvoiceId) {
      updateInvoice(editingInvoiceId, payload);
    } else {
      addInvoice(payload, "pending");
    }
    closeDrawer();
  };
  const onSaveAsDraft = () => {
    const data = getValues();
    const items = data.items.map((item) => ({
      ...item,
      quantity: Number(item.quantity) || 0,
      price: Number(item.price) || 0,
      total: (Number(item.quantity) || 0) * (Number(item.price) || 0),
    }));
    addInvoice({ ...data, items }, "draft");
    closeDrawer();
  };

  const onDiscard = () => closeDrawer();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex h-full flex-col">
      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-[104px] sm:px-10 sm:pt-[59px] lg:pl-[159px] lg:pr-[56px] lg:pt-[59px]">
        <div className="flex flex-col gap-10">
          {/* Title */}
          <h2 className="text-h2 font-bold text-text-primary dark:text-white">
            {isEditing ? (
              <>
                {" "}
                Edit <span className="text-text-muted">#</span>
                {editingInvoiceId}{" "}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>
          {/* ── Bill From ── */}
          <AddressSection  title="Bill From"  prefix="senderAddress"  register={register}  errors={errors} />
          {/* ── Bill To ── */}
          <AddressSection  title="Bill To"  prefix="clientAddress"  register={register}  errors={errors} />
          {/* ── Client Info ── */}
          <section className="flex flex-col gap-6">
            <FormField  id="clientName"  label="Client's Name"  error={errors.clientName?.message}  {...register("clientName")}/>
            <FormField  id="clientEmail"  label="Client's Email"  type="email"  placeholder="e.g. email@example.com"  error={errors.clientEmail?.message}  {...register("clientEmail")}/>
          </section>

          {/* ── Invoice Date + Payment Terms ── */}
          <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Controller  control={control}  name="createdAt"  render={({ field }) => (
                  <DatePicker  id="createdAt"  label="Invoice Date"  value={field.value}  onChange={field.onChange}  error={errors.createdAt?.message} />
                )}
              />
              <Controller  control={control}  name="paymentTerms"  render={({ field }) => (
                  <SelectField  id="paymentTerms" label="Payment Terms" value={field.value} options={PAYMENT_OPTIONS} onChange={(val) => field.onChange(Number(val))} error={errors.paymentTerms?.message} />
                )}
              />
            </div>
            <FormField  id="description"  label="Project Description"  placeholder="e.g. Graphic Design Service"  error={errors.description?.message}  {...register("description")}/>
          </section>
      {/* ── Item List ── */}
          <section>
            <h3 className="mb-6 text-[18px] font-bold text-[#777F98] tracking-[-0.38px]">
              Item List
            </h3>
            <div className="flex flex-col gap-4">
              {/* Table header — desktop only */}
              {fields.length > 0 && (
                <div className="hidden sm:grid grid-cols-[1fr_64px_100px_80px_18px] gap-4">
                  <span className="text-body text-text-muted dark:text-[#DFE3FA]">
                    Item Name
                  </span>
                  <span className="text-body text-text-muted dark:text-[#DFE3FA] text-center">
                    Qty.
                  </span>
                  <span className="text-body text-text-muted dark:text-[#DFE3FA]">
                    Price
                  </span>
                  <span className="text-body text-text-muted dark:text-[#DFE3FA]">
                    Total
                  </span>
                  <span />
                </div>
              )}
             {/* Items */}
              {fields.map((field, index) => {
                const qty = Number(watchedItems?.[index]?.quantity) || 0;
                const price = Number(watchedItems?.[index]?.price) || 0;
                return (
                  <InvoiceItemRow
                    key={field.id} field={field} index={index} register={register} errors={errors} quantity={qty} price={price} onRemove={() => remove(index)}
                  />
                );
              })}
              {/* Items error */}
              {errors.items?.root?.message && (
                <p className="text-body text-danger">
                  {errors.items.root.message}
                </p>
              )}
              {typeof errors.items?.message === "string" && (
                <p className="text-body text-danger">{errors.items.message}</p>
              )}
              {/* Add item button */}
              <button
                type="button"
                onClick={() => append(EMPTY_ITEM())}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-background-light dark:bg-[#252945] text-body-variant font-bold text-text-muted dark:text-[#DFE3FA] hover:bg-border dark:hover:bg-dark transition-colors duration-200"
              >
                <span className="text-lg leading-none">+</span>
                Add New Item
              </button>
            </div>
          </section>
          {/* ── Validation summary ── */}
          {Object.keys(errors).length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-body text-danger">
                - All fields must be added
              </p>
              {errors.items && (
                <p className="text-body text-danger">- An item must be added</p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* ── Fixed Bottom Buttons ── */}
      <InvoiceFormActions  isEditing={isEditing}  onDiscard={onDiscard}  onSaveAsDraft={onSaveAsDraft}  onSubmit={handleSubmit(onSubmit)}/>
    </form>
  );
}
