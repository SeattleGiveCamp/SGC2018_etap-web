////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using System;
using System.Threading.Tasks;
using Etap.Web.CloudClientLibrary;

namespace Etap.Web.CloudClientLibrary
{
    public interface ITableClient
    {
        Task AddFormData(FormDataEntity formData);
    }
}
