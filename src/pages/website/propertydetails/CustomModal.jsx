import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Icon from "@/components/ui/Icon";

export const CustomModal = ({
  activeModal,
  onClose,
  noFade,
  disableBackdrop,
  className = "max-w-xl",
  children,
  footerContent,
  centered,
  scrollContent,
  themeClass = "bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700",
  headerContent = "Basic Modal",
}) => {
  return (
    <Transition appear show={activeModal} as={Fragment}>
      <Dialog as="div" className="relative z-[99999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={noFade ? "" : "duration-300 ease-out"}
          enterFrom={noFade ? "" : "opacity-0"}
          enterTo={noFade ? "" : "opacity-100"}
          leave={noFade ? "" : "duration-200 ease-in"}
          leaveFrom={noFade ? "" : "opacity-100"}
          leaveTo={noFade ? "" : "opacity-0"}
        >
          {!disableBackdrop && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm" />
          )}
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`flex min-h-full justify-center text-center p-6 ${
              centered ? "items-center" : "items-start "
            }`}
          >
            <Transition.Child
              as={Fragment}
              enter={noFade ? "" : "duration-300  ease-out"}
              enterFrom={noFade ? "" : "opacity-0 scale-95"}
              enterTo={noFade ? "" : "opacity-100 scale-100"}
              leave={noFade ? "" : "duration-200 ease-in"}
              leaveFrom={noFade ? "" : "opacity-100 scale-100"}
              leaveTo={noFade ? "" : "opacity-0 scale-95"}
            >
              <Dialog.Panel
                className={`w-full transform overflow-hidden rounded-md bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-alll ${className}`}
              >
                <div
                  className={`w-full relative overflow-hidden py-2 md:py-4 px-2 md:px-5 flex justify-between  ${themeClass}`}
                >
                  <div className="w-[95%] leading-6 text-base">
                    {headerContent}
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 text-xs xs:text-[22px] self-start"
                  >
                    <Icon icon="heroicons-outline:x" />
                  </button>
                </div>
                <div
                  className={`p-2 md:p-4  w-full ${
                    scrollContent ? "overflow-y-auto max-h-[400px]" : ""
                  }`}
                >
                  {children}
                </div>
                {footerContent && (
                  <div className="px-4 py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700">
                    {footerContent}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
